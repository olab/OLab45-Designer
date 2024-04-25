import createInstance from '../createCustomInstance';
import {
  mapDetailsToServer,
  mapDetailsFromServer,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export function importFileUpload(
  formData,
  onProgressUpdate,
  onFileUploaded,
  onFileUploadError) {

  let data = {};

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
    onUploadProgress: onProgressUpdate
  };

  API.post('/import', formData, config)
    .then((response) => {
      if (response.data.extended_status_code !== 200) {
        onFileUploadError(response.data);
      }
      else {
        onFileUploaded(response.data);
      }
    })
    .catch((error) => {
      console.error(`Error uploading file: ${JSON.stringify(error)}`);
    });
}
