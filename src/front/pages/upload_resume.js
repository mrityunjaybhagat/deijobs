//import 'images/icon/upload-cloud.png'
//import uploadIcon from "../../assets/img/images/upload-cloud.png";
const UploadResume = () => {
    return(
        <>
<section className="">
  <div className="p-3 bg-white upload_container">
    <div className="upload_div text-center">
      {/* <img id="file_preview" src="images/icon/upload-cloud.png" alt="" /> */}
      <p className="fw-bold mb-0 mt-3">Supported File Formats</p>
      <p className="fw-light">(.jpg, .png)</p>
      <div className="position-relative">
        <button className="btn btn-block text-white py-2 px-4 mt-2">
          Upload
        </button>
        <input
          type="file"
          className="upload_file"
          onchange="encodeImageFileAsURL(this)"
        />
      </div>
    </div>
  </div>
</section>
        </>
    )
}
export default UploadResume;