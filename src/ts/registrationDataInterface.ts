
type custType =  String| File;

export default  interface registerationDataInterface{
   firstName: custType;
   lastName: custType;
   email: custType;
   phone: custType | number;
   DOB: custType;
   gender: custType;
   country: custType;
}


