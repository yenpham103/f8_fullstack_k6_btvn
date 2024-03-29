//Bai 1
// const errors = {
//   name: {
//     required: "Vui lòng nhập họ tên",
//     min: "Họ tên phải từ 5 ký tự",
//   },
//   email: {
//     email: "Định dạng email không hợp lệ",
//     unique: "Email đã có người sử dụng",
//     required: "Vui lòng nhập địa chỉ email",
//   },
//   password: {
//     required: "Vui lòng nhập mật khẩu",
//     same: "Mật khẩu phải khớp với mật khẩu nhập lại",
//   },
// };

// function getError(field) {
//   const errorPath = field.split(".");
//   const fieldName = errorPath[0];
//   const errorType = errorPath[1] || "required";

//   if (errors[fieldName] && errors[fieldName][errorType]) {
//     return errors[fieldName][errorType];
//   }

//   return "Hoc lap trinh khong kho";
// }
// console.log(getError("namee"));
// console.log(getError("name"));
// console.log(getError("name.min"));

// console.log(getError("email.email"));
// console.log(getError("email.unique"));
// console.log(getError("email.required"));

// console.log(getError("password"));
// console.log(getError("password.same"));

//Bai 2
function createPerson(name, age, address, shortName) {
  return {
    name,
    age,
    address,
    shortName,
  };
}
function createCustomers(customers) {
  const sortedCustomers = customers.sort((a, b) => a.age - b.age);
  const result = [];

  for (let i = 0; i < sortedCustomers.length; i++) {
    const customer = sortedCustomers[i];
    const shortName =
      customer.name.split(" ").slice(0, 1).join(" ") +
      " " +
      customer.name.split(" ").slice(2).join(" ");
    console.log(shortName);
    const newCustomer = createPerson(
      customer.name,
      customer.age,
      customer.address,
      shortName
    );

    result.push(newCustomer);
  }

  return result;
}

const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers);
console.log(result);

//Bai 3
// const data = [];

// //Ham khoi tao & check dkien
// function createUser(name, password, email) {
//   if (!name || !password || !email) {
//     console.error("Thiếu thông tin đăng ký!");
//   }

//   return {
//     name,
//     password,
//     email,
//     role: "user",
//   };
// }
// //Ham Register
// function handleRegister(name, password, email) {
//   const user = createUser(name, password, email);
//   data.push(user);
//   return data;
// }
// // fake data
// const dataRegister1 = handleRegister(
//   "Nguyen Van A",
//   "123456",
//   "nguyenvana@email.com"
// );
// const dataRegister2 = handleRegister(
//   "Nguyen Van B",
//   "1234567",
//   "nguyenvanb@email.com"
// );
// console.log(data);

// //Ham Login
// function handleLogin(email, password) {
//   const foundUser = data.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (!foundUser) {
//     console.error("Thông tin đăng nhập không hợp lệ!");
//   }

//   return foundUser;
// }

// const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");
// console.log(dataLogin);
