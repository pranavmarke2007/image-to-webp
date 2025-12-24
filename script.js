
document.getElementById("convertBtn").addEventListener("click", convertToWebP);

function convertToWebP() {
    const imageUrl = document.getElementById("gg").value.trim();

    if (!imageUrl) {
        alert("Please enter an image URL");
        return;
    }
    

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function (blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "converted.webp";
            link.click();
        }, "image/webp", 0.8);
    };

    img.onerror = function () {
        alert("Image could not be loaded (CORS issue or invalid URL)");
    };

    img.src = imageUrl;
}
// const input = document.getElementById("gh");

// input.addEventListener("change", () => {
//   const file = input.files[0];
//   if (!file) {
//     alert("Please select a file");
//     return;
//   }
//   if (!file.type.includes("jpeg")) {
//     alert("Please select a JPEG image");
//     return;
//   }

//   const img = new Image();
//   const reader = new FileReader();

//   reader.onload = function(e) {
//     img.src = e.target.result;
//   };

//   img.onload = function() {
//     const canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     canvas.toBlob(function(blob) {
//       const url = URL.createObjectURL(blob);

//       // Create or update a download link dynamically
//       let link = document.getElementById("downloadLink");
//       if (!link) {
//         link = document.createElement("a");
//         link.id = "downloadLink";
//         document.body.appendChild(link);
//       }
//       link.href = url;
//       link.download = "converted.webp";
//       link.textContent = "Download WebP";
//       link.style.display = "inline-block";
//     }, "image/webp", 0.8);
//   };

//   reader.readAsDataURL(file);
// });
const input = document.getElementById("gh");

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return alert("Please select an image file.");

  // Accept JPEG and PNG
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    return alert("Please select a JPEG or PNG image.");
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function() {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);

        // Create or update a download link dynamically
        let link = document.getElementById("downloadLink");
        if (!link) {
          link = document.createElement("a");
          link.id = "downloadLink";
          document.body.appendChild(link);
        }
        link.href = url;
        link.download = "converted.webp";
        link.textContent = "Download WebP";
        link.style.display = "inline-block";
      }, "image/webp", 0.8); // quality: 0.8 WebP
    };
  };

  reader.readAsDataURL(file);
});
