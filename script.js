
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
