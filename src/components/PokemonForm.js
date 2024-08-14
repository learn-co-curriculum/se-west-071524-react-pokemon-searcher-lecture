import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function PokemonForm({ onAddPokemon }) {
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    hp: yup.number().required("HP is required"),
    frontUrl: yup.string().required("Front URL is required"),
    backUrl: yup.string().required("Back URL is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: "",
    },
    validationSchema: formSchema,
    onSubmit: (values, actions) => {
      const newPokemon = {
        name: values.name,
        hp: values.hp,
        sprites: {
          front: values.frontUrl,
          back: values.backUrl,
        },
      };
      fetch("http://localhost:3001/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPokemon),
      })
        .then((r) => r.json())
        .then(onAddPokemon);
        actions.resetForm()
    },
  });

  
  return (
    <div>
      <h3>Add a Pokemon!</h3>
      {/* {formik.errors && Object.values(formik.errors).map((err) => <p style={{color: 'red'}}>{err}</p>)} */}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
          {formik.errors.name && formik.touched.name ? <p style={{color: 'red'}}>{formik.errors.name}</p> : null}
          <Form.Input
            fluid
            label="hp"
            placeholder="hp"
            id="hp"
            name="hp"
            value={formik.values.hp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.hp && formik.touched.hp ? <p style={{color: 'red'}}>{formik.errors.hp}</p> : null}
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            id="frontUrl"
            name="frontUrl"
            value={formik.values.frontUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.frontUrl && formik.touched.frontUrl ? <p style={{color: 'red'}}>{formik.errors.frontUrl}</p> : null}
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            id="backUrl"
            name="backUrl"
            value={formik.values.backUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.errors.backUrl && formik.touched.backUrl ? <p style={{color: 'red'}}>{formik.errors.backUrl}</p> : null}
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
