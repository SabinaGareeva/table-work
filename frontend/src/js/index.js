import { nanoid } from "nanoid";
import { Notification } from "./notification";
// получение доступа элементов разметки
const tableStudents = document.querySelector(`#studentTable`);
const tableBody = tableStudents.lastElementChild;
const form = document.querySelector(`#studentForm`);
const firstNameInput = document.querySelector(`#firstName`);
const surnameInput = document.querySelector(`#surname`);
const addressInput = document.querySelector(`#address`);
const ageInput = document.querySelector(`#age`);
const submitButton = document.querySelector(".btn-outline");

// Переменная для хранения объекта по которому произошел клик

let clickedStudent = null;
// Переменная для хранения id ряда в таблице по которому произошел клик
let tableRowCheckedId = null;

const init = () => {
    window.addEventListener("DOMContentLoaded", async () => {
        await loadJSON();
    });
};
init();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // если есть ряд в таблице, по которому кликнули, то значения с этого ряда передаются в input функции и происходит изменения в данных таблицы
    if (tableRowCheckedId) {
        console.log(tableRowCheckedId);
        clickedStudent.firstName = firstNameInput.value;
        clickedStudent.surname = surnameInput.value;
        clickedStudent.address = addressInput.value;
        clickedStudent.age = ageInput.value;
        updateStudentData(tableRowCheckedId, clickedStudent);
        resetForm();
    } else {
        // иначе добавляем студента из данных формы
        addStudent();
    }
});
// функция отрисовки данных с сервера
async function loadJSON() {
    let html = "";
    try {
        const response = await fetch(`http://localhost:3000/students`);
        if (response.ok) {
            const data = await response.json();
            if (data && Array.isArray(data)) {
                data.forEach((student) => {
                    html += `<tr id=${student.id}><td>${student.firstName}</td><td>${student.surname}</td>
                    <td>${student.address}</td><td>${student.age}<button id='button-delete'>x</button></button></td></tr>`;
                });
            }

            tableBody.innerHTML = "";
            tableBody.insertAdjacentHTML("beforeend", html);
            // Получение кнопок для удаления студента
            const deleteButtons = document?.querySelectorAll("#button-delete");

            deleteButtons.forEach((deleteButton) => {
                deleteButton.removeEventListener("click", deleteStudent);
                deleteButton.addEventListener("click", deleteStudent);
            });
            // получение строк таблицы для редактирования данных студента
            const tableRows = document.querySelectorAll("#studentTable tr");
            console.log(tableRows);
            tableRows.forEach((tableRow) => {
                tableRow.removeEventListener("click", (event) => {
                    appearanceStudentInInput(event, data);
                });
                tableRow.addEventListener("click", (event) => {
                    if (event.target.tagName !== "BUTTON")
                        appearanceStudentInInput(event, data);
                });
            });
            // обнуляем значения
            clickedStudent = null;
            tableRowCheckedId = null;
        } else {
            console.error("Ошибка загрузки данных", response.status);
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}
// функция добавления студента
const addStudent = async () => {
    const student = { id: `student-${nanoid()}` };

    // Собираем данные из формы
    Array.from(form?.elements).forEach((element) => {
        if (element.name) {
            student[element.name] = element.value;
        }
    });
    // обновляю данные на сервере
    try {
        const response = await fetch(`http://localhost:3000/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student),
        });
        // если запрос прошел, то очищаю форму и обновляю данные в таблице на странице
        if (response.ok) {
           const notificationInfo=new Notification({textNotification:'Данные студента добавлены'})
            resetForm();
            loadJSON();
        } else {
            console.log(`Error to add student.`);
        }
    } catch (error) {
        console.log("Error", error);
    }
    // }
};
// Функция удаления студента из таблицы и из сервера
async function deleteStudent(e) {
    let deleteStudent;
    if (e.target.tagName === "BUTTON") {
        deleteStudent = e.target.parentElement.parentElement;
        let deleteStudentId = e.target.parentElement.parentElement.id;
        // Удаляю данные студента с таблицы
        deleteStudent.remove();
        // Удаляю данные студента с сервера
        try {
            const response2 = await fetch(
                `http://localhost:3000/students/${deleteStudentId}`,
                {
                    method: "DELETE",
                },
            );
            if (response2.ok) {
                const notificationInfo=new Notification({textNotification:'Данные студента удалены'})
                resetForm();
                console.log("Студент удален из сервера");
                loadJSON();
            } else {
                console.log(`Error to delete student.`);
            }
        } catch {
            console.log("Error", error);
        }
    }
}
/**
 *
 * @param {object} event
 * @param {array} data
 */
// Функция передает данные по которым кликнули в input формы
async function appearanceStudentInInput(event, data) {
    // получаю id элемента по которому произошел клик
    tableRowCheckedId = event.currentTarget.id;
    // нахожу в массиве данных объект id которого равен id элемента по которому кликнули
    clickedStudent = data.find((student) => student.id === tableRowCheckedId);
    // если он есть, то в inputs формы появляются данные с ряда таблицы по которому кликнули
    if (clickedStudent) {
        firstNameInput.value = clickedStudent.firstName;
        surnameInput.value = clickedStudent.surname;
        addressInput.value = clickedStudent.address;
        ageInput.value = clickedStudent.age;
    }
}
/**
 *
 * @param {string} studentId
 * @param {object} updateStudentData
 */
// Функция обновляет измененные данные студента на сервере
async function updateStudentData(studentId, updateStudentData) {
    try {
        const response = await fetch(
            `http://localhost:3000/students/${studentId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateStudentData),
            },
        );
        if (response.ok) {
            const notificationInfo=new Notification({textNotification:'Данные студента обновлены'})
            console.log("Student data updated successfully");
            loadJSON();
        } else {
            console.log(`Error updating student data: ${response.statusText}`);
        }
    } catch (error) {
        console.log("Error updating student data:", error);
    }
}
// Функция отчистки формы и установка disabled для кнопки формы
function resetForm() {
    form.reset();
    submitButton.disabled = true;
    form.addEventListener("input", () => {
        if (
            firstNameInput.value.trim() !== "" &&
            surnameInput.value.trim() !== "" &&
            addressInput.value.trim() !== "" &&
            ageInput.value.trim() !== ""
        ) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    });
}
resetForm();
