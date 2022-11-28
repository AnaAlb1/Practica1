const Validator =
   ({ schema, getObject }) =>
      async (req, _, next) => {
         const dataObject = getObject(req)
         try {
            const validData = await schema.validate(dataObject, {
               abortEarly: false,
            });
            req.validData = validData;
         } catch (error) {
            req.errorData = error;
         }
         return next();
      };
      
      export default Validator;