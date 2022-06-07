import createInstance from '../createCustomInstance';
import {
  questionResponseToServer,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export const deleteResponse = (questionResponseId) => API
  .delete(`/questionresponses/${questionResponseId}`)
  .catch((error) => {
    throw error;
  });

export const createResponse = (scopedObjectData) => {
  const data = questionResponseToServer(scopedObjectData);
  return API
    .post(`/questionresponses`, {
      ...data
    })
    .then((
      {
        data: { data: { id: scopedObjectId } },
      },
    ) => scopedObjectId)
    .catch((error) => {
      throw error;
    });
};

export const editResponse = (scopedObjectData) => {
  const data = questionResponseToServer(scopedObjectData);
  API
    .put(`/questionresponses/${scopedObjectData.id}`, {
      ...questionResponseToServer(scopedObjectData)
    })
    .catch((error) => {
      throw error;
    });
};
