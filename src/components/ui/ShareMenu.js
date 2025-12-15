import { LucideShare2, Share2Icon } from "lucide-react";
import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

const ShareMenu = ({ title }) => {
  const [open, setOpen] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* <button
        onClick={() => setOpen(!open)}
        style={{
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        🔗 Share
      </button> */}
                <a href='#' onClick={() => setOpen(!open)}>
                  <LucideShare2/>
                  <span>Share</span>
                </a>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "35px",
            right: 0,
            background: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 100,
          }}
        >
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <button
            onClick={handleCopy}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
            title="Copy Link"
          >
            📋
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
