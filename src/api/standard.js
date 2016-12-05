import {apiViewStandardPdf, apiAddHistory, elasticSearch, apiGetHistory, apiLookupStandardById, apiGetStandardsFromMenu, apiValidStandard, apiSetNewStandard, apiGetStandardHtml, apiGetStandardPdf, apiStandardRevisions, Vue} from './config'

// Retrieves information about the standard.
export const getStandardInfo = (id) => {
  return Vue.http({url: apiLookupStandardById(id), method: 'GET'})
}

// Get Revisions
export const getStandardRevisions = (id) => {
  return Vue.http({url: apiStandardRevisions(id), method: 'GET'})
}

export const getStandardsByMenu = (menu) => {
  return Vue.http({url: apiGetStandardsFromMenu, method: 'POST', data: {'menu': menu}})
}

// Sends Standard Object for Server to Create Record
export const setNewStandard = (standard) => {
  return Vue.http({url: apiSetNewStandard, method: 'POST', data: {standard: standard}})
}

// Requires Admin
export const validStandard = (code) => {
  return Vue.http({url: apiValidStandard + code, method: 'GET'})
}

export const getHtmlStandard = (id) => {
  return Vue.http({url: apiGetStandardHtml(id), method: 'GET'})
}

// Gets the File
export const getPdfStandard = (id) => {
  return Vue.http({url: apiGetStandardPdf(id), method: 'GET'})
}

// View Redirects to a temporary link to access the PDF
export const viewPdfStandard = (id) => {
  return Vue.http({url: apiViewStandardPdf(id), method: 'GET'})
}

// Takes the current standardId and adds it to the user's history
export const addHistory = (standardId) => {
  return Vue.http({url: apiAddHistory + standardId, method: 'POST'})
}

export const getHistory = () => {
  return Vue.http({url: apiGetHistory})
}

export const searchStandard = (search, fields = ['code', 'description'], fuzzy = 2) => {
  var data = {}
  data.fields = (fields && fields.length > 0) ? fields : undefined
  data.search = search
  data.fuzzy = (fuzzy && typeof fuzzy === 'number') ? fuzzy : 0
  return Vue.http({url: elasticSearch, method: 'POST', data: data})
}
