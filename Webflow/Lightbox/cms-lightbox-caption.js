let cms_images = [];

function getCMSImages() {
  $("[nc-lightbox-element='image']").each(function () {
    const image = {
      img_src: $(this).attr("src"),
      img_alt: $(this).attr("alt"),
    };
    cms_images.push(image);
  });
}

function getCaption() {
	found_image = cms_images.find(
    (x) =>
      x.img_src ===
      $(".w-lightbox-view .w-lightbox-img.w-lightbox-image").attr("src")
  );
  return found_image.img_alt;
}

function addCaption() {
  $(".w-lightbox-figure").append("<p>" + getCaption() + "</p>");
}

// Start
getCMSImages();

$(document).on("DOMNodeInserted", function (e) {
  if (e.target.className.includes("w-lightbox-view")) {
    setTimeout(function () {
      addCaption();
    }, 400);
  }
});
