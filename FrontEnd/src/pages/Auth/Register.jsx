import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import "../../style/authstyles/register.css"
const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setinstitution] = useState("");
  const [program, setprogram] = useState("");
  const [studyDuration, setstudyDuration] = useState("");
  const [estimatedFunding, setestimatedFunding] = useState("");


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

    // Input validations
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
      { label: "Institution A", value: "Institution A" },
      { label: "Institution B", value: "Institution B" },
      { label: "Institution C", value: "Institution C" },
      { label: "Institution D", value: "Institution D" },
    ],
  });

  const navigate = useNavigate();

  // Checking errors
  const handleSubmit = () => {

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
       navigate('/')
    } else {
      alert("Veuillez corriger les erreurs avant de continuer.");
      console.log(errors);  
    }
   
  };

  return (
    <Box >
      <div className="all">
        <form className="form" >
        <Box
          p={10}
          borderRadius="lg"
          width="100%"
          boxShadow="md"
          
        >
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            textAlign="center"
          >
           Register
          </Heading>
            <Stack
              gap="4"
              align="flex-start"
              maxW="600"
            >
              <Field
                className="field"
                label="Full Name"
                invalid={!!errors.fullName}
                errorText={errors.fullName?.message}
              >
                <Input
                  className="input"
                  type="text"
                  placeholder="john doe"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
              </Field>
              <Field
                className="field"
                label="Email"
                invalid={!!errors.email}
                errorText={errors.email?.message}
              >
                <Input
                  className="input"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field
                className="field"
                label="Password"
                invalid={!!errors.password}
                errorText={errors.password?.message}
              >
                <PasswordInput
                  className="input"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field
                className="field"
                invalid={errors.institution}
                errorText={errors.institution?.message}
              >
               
                <SelectRoot
                  collection={institutions}
                  width="565px"
                  size="lg"
                  value={institution}
                  onValueChange={(e) => setinstitution(e.value[0])}
                >
                  <SelectLabel>Select Institution</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="institution" width="44.5rem" border="rgb(199, 193, 193) solid 2px" height='2rem' borderRadius="4px"/>
                      </SelectTrigger>
                    <SelectContent  width="565px" backgroundColor="white" >
                    {institutions.items.map((inst) => (
                      <SelectItem item={inst} key={inst.value}>
                        {inst.label}
                      </SelectItem>
                    ))}
                    </SelectContent>
                </SelectRoot>
              </Field>
              <Field
                className="field"
                label="Program"
                invalid={!!errors.program}
                errorText={errors.program?.message}
              >
                <Input
                  className="input"
                  type="text"
                  placeholder="enter your studying program"
                  value={program}
                  onChange={(e) => setprogram(e.target.value)}
                />
              </Field>
              <Field
                className="field"
                label="Study Duration in (Months)"
                invalid={!!errors.studyDuration}
                errorText={errors.studyDuration?.message}
              >
                <Input
                  className="input"
                  type="number"
                  placeholder="enter your study duration"
                  value={studyDuration}
                  onChange={(e) => setstudyDuration(e.target.value)}
                />
              </Field>
              <Field
                className="field"
                label="Estimated Funding($)"
                invalid={!!errors.estimatedFunding}
                errorText={errors.estimatedFunding?.message}
              >
                <Input
                  className="input"
                  type="number"
                  placeholder="enter your estimated funding"
                  value={estimatedFunding}
                  onChange={(e) => setestimatedFunding(e.target.value)}
                />
              </Field>
              <Button
              className="button"
                // type="submit"
                colorScheme="blue"
                width="full"
                onClick={handleSubmit}
              >
                Register
              </Button>
              <Text className='link'>
                Already have an account ?{" "}
                <Link href="/auth/login" color="blue.500">
                  Login
                </Link>
              </Text>
            </Stack>
        </Box>
          </form>
      </div>
    </Box>
  );
};

export default Register;
