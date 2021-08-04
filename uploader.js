var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
	uploadMultiple: false,
	acceptedFiles:'.jpg,.png,.jpeg,.gif',
	parallelUploads: 10,uploadMultiple: false,
	dictDefaultMessage : "Drag & Drop images you want to blur"
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
});
