
// Hàm validator , contructor function
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};
    // Hàm thực hiện validate
    function Validate(inputElement, rule) {
        // var errorElement = getParent(inputElement, '.form-group')

         //value : inputElement.value
        //test function : rule.test
        var errorMessage;
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector]

        // Lặp qua từng rule và kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    )
                    break
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    if (formElement) {

        // Loại bỏ hành vi mặc định của trình duyệt
        formElement.onsubmit = function(e) {
            e.preventDefault()

            var isFormValid = true

            // Thực hiện lặp qua từng rules và validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = Validate(inputElement,rule)
                if (!isValid) {
                    isFormValid = false
                }
            });


            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        
                        switch (input.type) {
                            case 'checkbox':
                                if(input.matches(':checked')) {
                                    values[input.name] = ''
                                    return values;
                                }

                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = []
                                }
                                values[input.name].push(input.value)

                                break
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break
                            case 'file':
                                values[input.name] = input.files
                                break
                            default: 
                                values[input.name] = input.value;
                        }

                        return values
                    }, {})

                    options.onSubmit(formValues)
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit()
                }
            }
        }

        // lặp qua mỗi rules và xử lý các sự kiện
        options.rules.forEach((rule) => {

            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }   else {
                selectorRules[rule.selector] = [rule.test]
            }
            // selectorRules[rule.selector] = rule.test

            var inputElements = formElement.querySelectorAll(rule.selector)

            Array.from(inputElements).forEach((inputElement) => {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = () => {
                    Validate(inputElement,rule)
                 }
 
                 // Xử lý mỗi khi người dùng nhập vào input
                 inputElement.oninput = () => {
                     var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
                     errorElement.innerText = ''
                     getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
                 }
            })
        })
    }
}



// định nghĩa các rules
// Nguyên tắc của các rules :
// 1. Khi có lỗi thì trả ra message lỗi
// 2. khi k có lỗi thì k trả ra gì cả (undefined)
Validator.isRequired = function(selector , message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
    }
}
Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : 'Trường này phải là Email'
        }
    }
}
Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự.`
        }
    }
}
Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Gía trị nhập vàp không chính xác'
        }
    }
}

document.querySelector('.register__numberphone').onclick = function() {SwapRegister()}
function SwapRegister() {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.container2').style.display = 'block';
}
document.querySelector('.prev').onclick = function() {Prev()}
function Prev() {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.container2').style.display = 'none';
}