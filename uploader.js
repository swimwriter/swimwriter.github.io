var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 10,uploadMultiple: false,
	dictDefaultMessage : "Drag & Drop images you want to blur",
  	url: 'https://api.cloudinary.com/v1_1/epadtool/image/upload'
});

myDropzone.on('sending', function (file, xhr, formData) {
	formData.append('api_key', 869149651216927);
	formData.append('timestamp', Date.now() / 1000 | 0);
	formData.append('upload_preset', 'uoeqfpy3');
});
myDropzone.on('success', function (file, response) {
	console.log('Success! Cloudinary public ID is', response.public_id);
	myDropzone.removeFile(file);
	$(".gal-container").append(
		    `<div class="col-md-4 col-sm-6 co-xs-12 gal-item">
		      <div class="box">
			<a href="#" data-toggle="modal" data-target="#1">
			  <img src="https://res.cloudinary.com/epadtool/image/upload/e_pixelate_faces:30/e_blur_faces:800/w_300,h_120/${response.public_id}">
			</a>
			<div class="modal fade" id="1" tabindex="-1" role="dialog">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
			      <div class="modal-body">
				<img src="https://res.cloudinary.com/epadtool/image/upload/e_pixelate_faces:30/e_blur_faces:800/${response.public_id}">
			      </div>
				<div class="col-md-12 description">
				  <h4>This is the first one on my Gallery</h4>
				</div>
			    </div>
			  </div>
			</div>
		      </div>
		    </div>`
	
	);
	
});
