export const testData = {
  // TextBox form data
  textBoxForm: {
    userName: 'kader',
    userEmail: 'kader@getmobil.com',
    currentAddress: 'istanbul',
    permanentAddress: 'istanbul'
  },

  // Web Tables form data
  webTableForm: {
    firstName: 'kader',
    lastName: 'kader',
    email: 'kader@getmobil.com',
    age: '30',
    salary: '10000',
    department: 'IT'
  },

  // Practice Form data
  practiceForm: {
    firstName: 'kader',
    lastName: 'baran',
    email: 'kader@getmobil.com',
    gender: 'male' as const,
    phoneNumber: '5555555555',
    subject: 'Maths',
    hobby: 'reading' as const,
    address: 'istanbul'
  },

  // Expected messages
  messages: {
    doubleClick: 'You have done a double click',
    rightClick: 'You have done a right click',
    dynamicClick: 'You have done a dynamic click',
    yes: 'Yes',
    impressive: 'Impressive',
    home: 'home',
    created: 'Link has responded with staus 201 and status text Created',
    noContent: 'Link has responded with staus 204 and status text No Content',
    registrationForm: 'Registration Form'
  }
}; 