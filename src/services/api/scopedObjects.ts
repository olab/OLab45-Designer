import createInstance from '../createCustomInstance';
import {
  scopedObjectToServer,
  scopedObjectFromServer,
  scopedObjectByTypeFromServer,
  scopedObjectDetailsFromServer,
  fileObjectToServer,
} from '../../helpers/applyAPIMapping';
import Constants from '../../components/SOEditor/Constants';

const API = createInstance();

export const getScopedObjects = (mapId) =>
  API.get(`/designer/maps/${mapId}/scopedobjects`)
    .then(({ data: { data: scopedObjects } }) =>
      Object.keys(scopedObjects).reduce((scopedObjectsNew, key) => {
        scopedObjectsNew[key] = scopedObjects[key].map((SO) =>
          scopedObjectFromServer(SO),
        );

        return scopedObjectsNew;
      }, {}),
    )
    .catch((error) => {
      throw error;
    });

export const getScopedObjectsByParent = (
  scopedObjectParentType,
  scopedObjectParentId,
  scopedObjectType,
) =>
  API.get(
    `/${scopedObjectParentType}/${scopedObjectParentId}/${scopedObjectType}`,
  )
    .then(({ data: { data: scopedObjectDetails } }) =>
      scopedObjectDetailsFromServer(scopedObjectDetails),
    )
    .catch((error) => {
      throw error;
    });

export function getScopedObjectsByType(scopedObjectType) {
  return API.get(`/${scopedObjectType}`)
    .then(({ data: { data: scopedObjects } }) =>
      scopedObjects.map((SO) => scopedObjectByTypeFromServer(SO)),
    )
    .catch((error) => {
      throw error;
    });
}

export function getScopedObjectDetails(scopedObjectId, scopedObjectType) {
  return API.get(`/${scopedObjectType}/${scopedObjectId}`)
    .then(({ data: { data: scopedObjectDetails } }) =>
      scopedObjectDetailsFromServer(scopedObjectDetails),
    )
    .catch((error) => {
      throw error;
    });
}

export function createScopedObject(scopedObjectType, scopedObjectData) {
  // handle special case of 'file' object, which has FormData
  if (scopedObjectType === 'files') {
    const form = fileObjectToServer(scopedObjectData);

    return API.post(`/${scopedObjectType}`, form, {
      headers: { 'Content-Type': `multipart/form-data` },
    })
      .then(
        ({
          data: {
            data: { id: scopedObjectId },
          },
        }) => scopedObjectId,
      )
      .catch((error) => {
        throw error;
      });
  } else
    return API.post(`/${scopedObjectType}`, {
      ...scopedObjectToServer(scopedObjectData),
    })
      .then(
        ({
          data: {
            data: { id: scopedObjectId },
          },
        }) => scopedObjectId,
      )
      .catch((error) => {
        throw error;
      });
}

export const editScopedObject = (
  scopedObjectId,
  scopedObjectType,
  editedScopedObjectData,
) =>
  API.put(`/${scopedObjectType}/${scopedObjectId}`, {
    ...scopedObjectToServer(editedScopedObjectData),
  }).catch((error) => {
    throw error;
  });

export const deleteScopedObject = (scopedObjectId, scopedObjectType) =>
  API.delete(`/${scopedObjectType}/${scopedObjectId}`).catch((error) => {
    throw error;
  });

export const getQuestionResponseDetails = (questionId, questionResponseId) =>
  API.get(`/questions/${questionId}/questionResponses/${questionResponseId}`)
    .then(({ data: { data: scopedObjectDetails } }) =>
      scopedObjectDetailsFromServer(scopedObjectDetails),
    )
    .catch((error) => {
      throw error;
    });

export const createQuestionResponse = (
  questionId,
  questionResponseId,
  scopedObjectData,
) =>
  API.post(`/questions/${questionId}/questionResponses/${questionResponseId}`, {
    data: {
      ...scopedObjectToServer(scopedObjectData),
    },
  })
    .then(
      ({
        data: {
          data: { id: scopedObjectId },
        },
      }) => scopedObjectId,
    )
    .catch((error) => {
      throw error;
    });

export const editQuestionResponse = (
  questionId,
  questionResponseId,
  editedScopedObjectData,
) =>
  API.put(`/questions/${questionId}/questionResponses/${questionResponseId}`, {
    data: {
      ...scopedObjectToServer(editedScopedObjectData),
    },
  }).catch((error) => {
    throw error;
  });

export const deleteQuestionResponse = (questionId, questionResponseId) =>
  API.delete(
    `/questions/${questionId}/questionResponses/${questionResponseId}`,
  ).catch((error) => {
    throw error;
  });
