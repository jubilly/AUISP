import session from "./session.js";
import { validateCategory, validateForm, validateFile } from "./validators.js";

const errors = [
	'valueMissing',
	'typeMismatch',
	'patternMismatch',
	'tooShort',
	'customError'
];

const messages = {
	name: {
		valueMissing: "O campo de nome não pode estar vazio.",
		patternMismatch: "Por favor, preencha um nome válido.",
		tooShort: "Por favor, preencha um nome válido."
	},
	date: {
		valueMissing: "O campo de data não pode estar vazio.",
		typeMismatch: "Por favor, preencha uma data válida",
	},
	local: {
		valueMissing: "O campo de local não pode estar vazio.",
		typeMismatch: "Por favor, preencha um local válido.",
	},
	note: {
		valueMissing: 'O campo de note não pode estar vazio.',
	},
	file: {
		valueMissing: 'O campo file não pode estar vazio.',
		customError: 'O arquivo deve ser um PDF, DOC, DOCX, TXT, PNG, JPG ou JPEG.'
	},
	category: {
		valueMissing: 'Você deve selecionar uma categoria.',
		customError: 'Você deve selecionar uma categoria.'
	}
};

const handleSave = () => {
	const exam = document.querySelector('[data-form="api.exam.$id"]');
	const formData = new FormData(exam);

	const name = formData.get('name');
	const date = formData.get('date');
	const local = formData.get('local');
	const note = formData.get('note');
	const file = formData.get('file');
	const category = formData.get('category');

	const valid = validateForm(name, date, local, note, file, category);

	if (!valid) {
		
		return;
	}

	//Note: Generate a new and uniq id for the new exam
	let id = 1;
	const user = JSON.parse(localStorage.getItem('login-user'));
	if (localStorage.getItem('new-exam')) {
		const exam = JSON.parse(localStorage.getItem('new-exam'));
		id = exam.id === id ? id + 1 : id;
	}

	const data = {
		id,
		user: user?.id || 1,
		name,
		date,
		local,
		note,
		file: file.arrayBuffer,
		category
	};

	localStorage.setItem(`new-exam-${id}`, JSON.stringify(data));
	id++;
};

function handleFieldEvent(field) {
	field.setCustomValidity('');

	if (field.name === 'file') {
		validateFile(field.files[0]);
	}

	if (field.name === 'category' && !validateCategory(field.value)) {
		field.setCustomValidity('O campo categoria não pode ser o padrão.');
	}

	let message = "";

	const fieldErroMessage = field.parentNode.querySelector('.error-message');
	errors.forEach(error => {
		if (field.validity[error]) {
			if (field.validity.customError) {
				message = field.validationMessage;
				return;
			}
			message = messages[field.name][error];
		}
	});

	const isInputValid = field.checkValidity();
	if (!isInputValid) {
		fieldErroMessage.textContent = message;
	} else {
		fieldErroMessage.textContent = '';
	}
}

(function(){
	const form = document.querySelector('[data-form="api.exam.$id"]');
	const inputs = form.querySelectorAll('input, select');

	const button = document.querySelector('[data-form="api.exam.$id"] button[type="submit"]');
	const preview = document.querySelector('[data-form="api.exam.$id"] [data-button="preview"]');

	inputs.forEach(input => {
		const type = input.type;
		if (type === 'file' || type === 'date' || input.name === 'category') {
			input.addEventListener('change', () => handleFieldEvent(input));
		}

		if (type === 'text') {
			input.addEventListener('blur', () => handleFieldEvent(input));
		}

		input.addEventListener('invalid', event => event.preventDefault());

		preview.addEventListener('click', (event) => {
			event.preventDefault();
			handleFieldEvent(input);
		});
		button.addEventListener('click', (event) => {
			event.preventDefault();
			handleFieldEvent(input);
		});
	});

	button.addEventListener('click', (event) => {
		event.preventDefault();
		handleSave();
	});

	preview.addEventListener('click', (event) => {
		event.preventDefault();
		handleSave();
	});

	document.addEventListener('DOMContentLoaded', session);
})();