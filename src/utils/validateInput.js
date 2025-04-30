const isValidPhone = (phone) => {
    const regex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
    return regex.test(phone.trim());
  }
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
  }
const isValidID = (id) => {
    const regex = /^\d{12}$/;
    return regex.test(id.trim());
  }
  export{
    isValidEmail,
    isValidPhone,
    isValidID
  }