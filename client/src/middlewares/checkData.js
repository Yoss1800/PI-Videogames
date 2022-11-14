const validateCreateVG = (input) => {
  let errors =  {};
  if (!input.name){
    errors.name = 'Name is requiered';
  } else if(input.name === 'name' && !/\S+@\S+\.\S+/.test(input.name)){
    errors.name="Name is invalid";
  }

  return errors;

};

module.exports = validateCreateVG;