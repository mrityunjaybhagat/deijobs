import { Button } from "@/components/common/ui/button";
import { DatePicker } from "@/components/common/ui/date-picker";
import { Input } from "@/components/common/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CreatableSelect from "react-select/creatable";
import * as yup from "yup";
import { createStudentProfile } from "@/services/OtherService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import useGetProfileData from "./hooks/useGetProfileData";
import useGetProfileDropdown from "./hooks/useGetProfileDropdown";
import SearchSelect from "@/components/common/ui/SearchSelect";
import { debounce } from "lodash";
import { getAllJobs } from "@/services/JobService";
import Loader from "@/components/common/Loader/Loader";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const schema = yup
  .object({
    fullName: yup
      .string()
      .transform((value) => (typeof value === "string" ? value.trim() : value))
      .test("is-not-empty", "Full name is required", (value) => {
        return value !== "" && value !== undefined && value !== null;
      })
      .required("Full name is required"),
    email: yup
      .string()
      .transform((value) => (typeof value === "string" ? value.trim() : value))
      .test("is-not-empty", "Email address is required", (value) => {
        return value !== "" && value !== undefined && value !== null;
      })
      .matches(emailRegex, "Invalid email address")
      .required("Email address is required"),
    dniCategory: yup
      .mixed()
      .notOneOf([""], "D & I category is required")
      .required("D & I category is required"),
    gender: yup
      .mixed()
      .notOneOf([""], "Gender is required")
      .required("Gender is required"),
    jobRole: yup
      .mixed()
      .notOneOf([""], "Job role is required")
      .required("Job role is required"),
    experience: yup
      .mixed()
      .notOneOf([""], "Experience is required")
      .required("Experience is required"),
  })
  .required();

export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

const CreateProfile = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const { userData } = useUser();
  const [submitLoading, setSubmitLoading] = useState(false);

  const setDateOfBirth = (value) => {
    setValue("dob", value);
    const dateOfBirth = new Date(value);
    const age = calculateAge(dateOfBirth);
    if (age < 16) {
      setError("dob", {
        type: "manual",
        message: "You must be at least 16 years old",
      });
    } else {
      clearErrors("dob");
    }
  };

  const { data, isLoading, error } = useGetProfileData({
    userId: JSON.parse(localStorage.getItem("login_token")),
  });
  const { DIOptions, experienceOption } = useGetProfileDropdown();
  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
    { label: "Don’t want to reveal", value: "Don’t want to reveal" },
  ];

  useEffect(() => {
    if (!isLoading) {
      const dobValue = data?.data?.user_data[0]?.dob;
      const dob = dobValue ? new Date(dobValue) : null;
      reset({
        dob: dob ? dob : userData?.dob ? new Date(userData?.dob) : "",
        fullName: data?.data?.user_data[0]?.name
          ? data?.data?.user_data[0]?.name
          : userData?.name ?? "",
        email: data?.data?.user_data[0]?.email
          ? data?.data?.user_data[0]?.email
          : userData?.email ?? "",
        dniCategory: data?.data?.user_data[0]?.dni_category
          ? {
              value: data?.data?.user_data[0]?.dni_category,
              label: data?.data?.user_data[0]?.dni_category,
            }
          : "",
        gender: data?.data?.user_data[0]?.gender
          ? {
              value: data?.data?.user_data[0]?.gender,
              label: data?.data?.user_data[0]?.gender,
            }
          : "",
        jobRole: data?.data?.user_data[0]?.job_role
          ? {
              value: data?.data?.user_data[0]?.job_role,
              label: data?.data?.user_data[0]?.job_role,
            }
          : "",
        experience: data?.data?.user_data[0]?.experience
          ? {
              value: data?.data?.user_data[0]?.experience,
              label: data?.data?.user_data[0]?.experience,
            }
          : userData?.experience ?? "",
      });
    }
    // if (userData) {
    //   reset({
    //     email: userData?.email ?? "",
    //     fullName: userData?.name ?? "",
    //     dob: userData?.dob ? new Date(userData?.dob) : "",
    //     experience: userData?.experience,
    //     // mobile: userData?.mobile,
    //   });
    // }
  }, [data, userData]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("login_token"));
      setSubmitLoading(true);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const newData = {
        ...data,
        jobRole: data?.jobRole?.value,
        experience: data?.experience?.value,
        userId: userId,
        dniCategory: data?.dniCategory?.value,
        gender: data?.gender?.value,
        dob: data?.dob,
      };
      const response = await createStudentProfile(newData);
      if (response.code == 200) {
        setSubmitLoading(false);
        navigate("/jobs");
      }
    } catch (error) {
      console.error("Error creating profile", error);
      setSubmitLoading(false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "38px",
      height: "38px",
      boxShadow: state.isFocused ? null : null,
      border: true ? "" : "none",
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "38px",
      padding: "0 4px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9e9da1",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "38px",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "300px", // Set the maximum height for the dropdown
      overflowY: "auto",
    }),
  };
  const getOptions = async (val) => {
    if (val) {
      try {
        setRolesLoading(true);
        const options = await getAllJobs("get-masters-details", {
          tableName: "job_roles",
          name: val,
        });
        setRoles(
          options.data.map((item) => ({ value: item.name, label: item.name }))
        );
        setRolesLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const searchHandler = useMemo(() => {
    return debounce((v) => {
      getOptions(v);
    }, 200);
  }, []);
  return (
    <form className="px-5 pb-[44px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-6 pb-14">
        <div className="text-gray-900 text-2xl font-semibold leading-loose">
          Create Your Profile
        </div>
        <div className=" text-gray-500 text-xs font-light leading-normal">
          Precision in your resume details increases your chances of landing the
          perfect job. Make every word count
        </div>
        <div className="flex flex-col gap-5">
          <div className="pt-6">
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Full Name
              <Input placeholder="Enter your name" {...register("fullName")} />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["fullName"]?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Date of Birth
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    className="bottom-0"
                    setDate={setDateOfBirth}
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {errors["dob"]?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Email Address
              <Input {...register("email")} placeholder="Enter Email" />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["email"]?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              D & I Category
              <Controller
                name="dniCategory"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    className="w-full text-black text-base font-normal font-['Lexend'] leading-normal"
                    options={DIOptions?.data?.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    isSearchable={false}
                    placeholder="Select an option"
                    height="38px"
                    border={true}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      setValue("dniCategory", newValue);
                    }}
                    val={getValues("dniCategory")}
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["dniCategory"]?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Gender
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    className="w-full text-black text-base font-normal font-['Lexend'] leading-normal"
                    options={genderOptions}
                    isSearchable={false}
                    placeholder="Select your gender"
                    height="38px"
                    border={true}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      setValue("gender", newValue);
                    }}
                    val={getValues("gender")}
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["gender"]?.message}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Job Role
              <Controller
                name="jobRole"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    name="jobRole"
                    options={roles}
                    value={getValues("jobRole")}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      setValue("jobRole", selectedOption);
                    }}
                    onInputChange={(inputVal) => {
                      searchHandler(inputVal);
                    }}
                    onCreateOption={(inputValue) => {
                      const newOption = {
                        value: inputValue,
                        label: inputValue,
                      };
                      setValue("jobRole", newOption);
                    }}
                    noOptionsMessage={() => "Search Roles"}
                    placeholder="Select Role"
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["jobRole"]?.message}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium leading-6 flex flex-col gap-1.5">
              Experience
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <SearchSelect
                    className="w-full text-black text-base font-normal font-['Lexend'] leading-normal"
                    options={experienceOption?.data?.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    isSearchable={true}
                    placeholder="Select an option"
                    height="38px"
                    border={true}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      setValue("experience", newValue);
                    }}
                    val={getValues("experience")}
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["experience"]?.message}
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={Object.keys(errors).length > 0}
        className="w-full"
      >
        <div className="flex items-center gap-2">
          <div>Save and Continue</div>
          <Loader size={20} loading={submitLoading} />
        </div>
      </Button>
    </form>
  );
};

CreateProfile.layoutProps = {
  requiredAuth: true,
};
export default CreateProfile;
