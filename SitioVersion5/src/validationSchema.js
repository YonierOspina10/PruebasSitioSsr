import * as yup from 'yup';

/**
 * Generates a Yup validation schema based on the provided fields.
 *
 * @param {Array} fields - An array of field definitions, each containing:
 * @param {string} fields[].name - The name of the field, which may include nested paths.
 * @param {string} fields[].validationType - The type of validation to apply (e.g., 'string', 'number').
 * @param {string} [fields[].validationTypeError] - Custom error message for type errors.
 * @param {Array} [fields[].validations] - Additional validation rules to apply to the field.
 * @returns {Object} - A Yup validation schema object.
 */
const getValidationSchema = (fields) => {
	// Reduce the fields array into a Yup validation schema
	const schema = fields.reduce((schema, field) => {
		const {
			name,
			validationType,
			validationTypeError,
			validations = [],
		} = field;

		// Check if the field name indicates a nested object
		const isObject = name.indexOf('.') >= 0;

		// Skip if the validation type is not a valid Yup method
		if (!yup[validationType]) {
			return schema;
		}

		// Initialize the validator with the specified validation type
		let validator = yup[validationType]().typeError(
			validationTypeError || ''
		);

		// Apply additional validations to the validator
		validations.forEach((validation) => {
			const { params, type } = validation;
			// Skip if the validation type is not a valid method on the validator
			if (!validator[type]) {
				return;
			}
			// Apply the validation with the provided parameters
			validator = validator[type](...params);
		});

		// If the field is not nested, add it directly to the schema
		if (!isObject) {
			return schema.concat(yup.object().shape({ [name]: validator }));
		}

		// Handle nested object paths by reversing the path
		const reversePath = name.split('.').reverse();
		const currNestedObject = reversePath.slice(1).reduce(
			(yupObj, path, index, source) => {
				// Check if the path is an array index
				if (!isNaN(path)) {
					return {
						array: yup.array().of(yup.object().shape(yupObj)),
					};
				}
				// If the current object is an array, maintain the array structure
				if (yupObj.array) {
					return { [path]: yupObj.array };
				}
				// Otherwise, create a new object shape
				return { [path]: yup.object().shape(yupObj) };
			},
			{ [reversePath[0]]: validator }
		);

		// Create a new schema for the nested object
		const newSchema = yup.object().shape(currNestedObject);
		// Concatenate the new schema to the existing schema
		return schema.concat(newSchema);
	}, yup.object().shape({})); // Start with an empty object schema

	return schema; // Return the final validation schema
};

export default getValidationSchema; // Export the function for use in other modules

// FILE DOCUMENTED
