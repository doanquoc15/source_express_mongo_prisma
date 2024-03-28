const responseWithData = (res:any, statusCode:any, data:any) =>
  res.status(statusCode).json(data);

const error = (res:any) =>
  responseWithData(res, 500, {
    status: 500,
    message: 'Oops! Something worng!',
  });

const badRequest = (res:any, message: string) =>
  responseWithData(res, 400, {
    status: 400,
    message,
  });

const ok = (res:any, data:any) => responseWithData(res, 200, data);

const created = (res:any, data:any) => responseWithData(res, 201, data);

const unauthorize = (res:any, message:string) =>
  responseWithData(res, 401, {
    status: 401,
    message,
  });

const notFound = (res:any) =>
  responseWithData(res, 404, {
    status: 404,
    message: 'Resource not found',
  });

const forbidden = (res:any) =>
  responseWithData(res, 403, {
    status: 403,
    message: 'Forbidden',
  });

export default {
  error,
  badRequest,
  ok,
  created,
  unauthorize,
  notFound,
  forbidden,
};