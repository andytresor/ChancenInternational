import React, { useState } from "react";
import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../components/ui/select";
import styles from "../../style/authstyles/regist.module.css";
const Regist = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setinstitution] = useState("");
  const [program, setprogram] = useState("");
  const [studyDuration, setstudyDuration] = useState("");
  const [estimatedFunding, setestimatedFunding] = useState("");

  // const formData = {
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   institution: "",
  //   program: "",
  //   studyDuration: "",
  //   estimatedFunding: "",
  // };

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    institution: "",
    program: "",
    studyDuration: "",
    estimatedFunding: "",
  });

  const validate = () => {
    const newErrors = {};

    // Validation des champs
    if (!fullName) {
      newErrors.fullName = "Le nom complet est requis.";
    }

    if (!email) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "L'adresse email est invalide.";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      newErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères.";
    }

    if (!institution) {
      newErrors.institution =
        "Veuillez sélectionner une institution partenaire.";
    }

    if (!program) {
      newErrors.program = "Le programme d'études est requis.";
    }

    if (!studyDuration) {
      newErrors.studyDuration = "La durée des études est requise.";
    } else if (isNaN(studyDuration) || studyDuration <= 0) {
      newErrors.studyDuration =
        "La durée des études doit être un nombre valide.";
    }

    if (!estimatedFunding) {
      newErrors.estimatedFunding =
        "Le montant estimé du financement est requis.";
    } else if (isNaN(estimatedFunding) || estimatedFunding <= 0) {
      newErrors.estimatedFunding = "Le montant doit être un nombre valide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const institutions = createListCollection({
    items: [
      { label: "logbesou", value: "logbesou" },
      { label: "balli", value: "balli" },
      { label: "mbouda", value: "mbouda" },
      { label: "yaounde", value: "yaounde" },
    ],
  });

  // Gestion de la soumission du formulaire
  const handleSubmit = () => {
    // console.log(
    //   "Données soumises :",
    //   email,
    //   password,
    //   fullName,
    //   institutions,
    //   program,
    //   studyDuration,
    //   estimatedFunding
    // );

    if (validate()) {
      console.log(
        "Données soumises :",
        fullName,
        email,
        password,
        institution,
        program,
        studyDuration,
        estimatedFunding
      );
      alert("Inscription réussie !");
    } else {
      alert("Veuillez corriger les erreurs avant de continuer.");
    }
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  // console.log(institution);
  return (
    <Box className={styles.Preg}>
      <div className={styles.signin}>
        <Box
          className={styles.signinForm}
          p={4}
          maxW="600px"
          mx="auto"
          mt="100px"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading
            as="h2"
            size="lg"
            mb={6}
            textAlign="center"
            className={styles.head}
          >
            Inscription Étudiant
          </Heading>
          <form
            // onSubmit={handleSubmit}
            className={styles.form}
          >
            <Stack
              gap="4"
              align="flex-start"
              maxW="600"
              className={styles.stack}
            >
              <Field
                className={styles.field}
                label="Full Name"
                invalid={!!errors.fullName}
                errorText={errors.fullName?.message}
              >
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="john doe"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
              </Field>
              <Field
                className={styles.field}
                label="Email"
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  className={styles.input}
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field
                className={styles.field}
                label="Password"
                invalid={!!errors.password}
                errorText={errors.password?.message}
              >
                <PasswordInput
                  className={styles.input}
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field
                className={styles.field}
                invalid={errors.institution}
                errorText={errors.institution?.message}
              >
                <SelectRoot
                  collection={institutions}
                  size="sm"
                  width="565px"
                  value={institution}
                  onValueChange={(e) => setinstitution(e.value[0])}
                >
                  <SelectLabel>Select institutions</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.items.map((inst) => (
                      <SelectItem item={inst} key={inst.value}>
                        {inst.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
              <Field
                className={styles.field}
                label="Program"
                invalid={!!errors.program}
                errorText={errors.program?.message}
              >
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="enter your studying program"
                  value={program}
                  onChange={(e) => setprogram(e.target.value)}
                />
              </Field>
              <Field
                className={styles.field}
                label="Study Duration in (Months)"
                invalid={!!errors.studyDuration}
                errorText={errors.studyDuration?.message}
              >
                <Input
                  className={styles.input}
                  type="number"
                  placeholder="enter your study duration"
                  value={studyDuration}
                  onChange={(e) => setstudyDuration(e.target.value)}
                />
              </Field>
              <Field
                className={styles.field}
                label="Estimated Funding in dolars"
                invalid={!!errors.estimatedFunding}
                errorText={errors.estimatedFunding?.message}
              >
                <Input
                  className={styles.input}
                  type="number"
                  placeholder="enter your estimated funding"
                  value={estimatedFunding}
                  onChange={(e) => setestimatedFunding(e.target.value)}
                />
              </Field>
              <Button
                // type="submit"
                colorScheme="blue"
                width="full"
                onClick={handleSubmit}
              >
                Register
              </Button>
              <Text className={styles.link}>
                Already have an account ?{" "}
                <Link href="/login" color="blue.500">
                  Login
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </div>
    </Box>
  );
};

export default Regist;
