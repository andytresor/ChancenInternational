import React, { useState } from "react";
import {
  Input,
  Button,
  Select,
  Stack,
  Box,
  Heading,
  SelectItem,
} from "@chakra-ui/react";
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/form-control";
// import { CustomSelect } from "../../components/custom-select";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    institution: "",
    program: "",
    studyDuration: "",
    estimatedFunding: "",
  });

  const [errors, setErrors] = useState({});

  // Liste des institutions partenaires
  const institutions = [
    "Institution 1",
    "Institution 2",
    "Institution 3",
    "Institution 4",
  ];

  // Validation des champs
  const validate = () => {
    const newErrors = {};

    // Validation des champs
    if (!formData.fullName) {
      newErrors.fullName = "Le nom complet est requis.";
    }

    if (!formData.email) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'adresse email est invalide.";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères.";
    }

    if (!formData.institution) {
      newErrors.institution =
        "Veuillez sélectionner une institution partenaire.";
    }

    if (!formData.program) {
      newErrors.program = "Le programme d'études est requis.";
    }

    if (!formData.studyDuration) {
      newErrors.studyDuration = "La durée des études est requise.";
    } else if (isNaN(formData.studyDuration) || formData.studyDuration <= 0) {
      newErrors.studyDuration =
        "La durée des études doit être un nombre valide.";
    }

    if (!formData.estimatedFunding) {
      newErrors.estimatedFunding =
        "Le montant estimé du financement est requis.";
    } else if (
      isNaN(formData.estimatedFunding) ||
      formData.estimatedFunding <= 0
    ) {
      newErrors.estimatedFunding = "Le montant doit être un nombre valide.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Données soumises :", formData);
      alert("Inscription réussie !");
    } else {
      alert("Veuillez corriger les erreurs avant de continuer.");
    }
  };

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" size="lg" mb={6}>
        Inscription Étudiant
      </Heading>
      <form onSubmit={handleSubmit}>
        {/* Nom complet */}
        <FormControl isInvalid={!!errors.fullName} mb={4}>
          <FormLabel htmlFor="fullName">Nom complet</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Entrez votre nom complet"
          />
          {errors.fullName && (
            <FormErrorMessage>{errors.fullName}</FormErrorMessage>
          )}
        </FormControl>

        {/* Email */}
        <FormControl isInvalid={!!errors.email} mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>

        {/* Mot de passe */}
        <FormControl isInvalid={!!errors.password} mb={4}>
          <FormLabel htmlFor="password">Mot de passe</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Entrez un mot de passe"
          />
          {errors.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>
        <CustomSelect
          isInvalid={!!errors.institution}
          errorText={errors.institution}
          options={institutions}
          placeholder="Sélectionnez une institution"
          label="Institution partenaire"
          value={formData.institution}
        />

        {/* Institution partenaire */}
        {/* <FormControl isInvalid={!!errors.institution} mb={4}>
          <FormLabel htmlFor="institution">Institution partenaire</FormLabel>
          <Select
            id="institution"
            name="institution"
            defaultValue=""
            value={formData.institution}
            onChange={handleChange}
            placeholder="Sélectionnez une institution"
          />
          {errors.institution && (
            <FormErrorMessage>{errors.institution}</FormErrorMessage>
          )}
        </FormControl> */}

        {/* Programme d'études */}
        <FormControl isInvalid={!!errors.program} mb={4}>
          <FormLabel htmlFor="program">Programme d'études</FormLabel>
          <Input
            id="program"
            name="program"
            type="text"
            value={formData.program}
            onChange={handleChange}
            placeholder="Entrez votre programme d'études"
          />
          {errors.program && (
            <FormErrorMessage>{errors.program}</FormErrorMessage>
          )}
        </FormControl>

        {/* Durée des études */}
        <FormControl isInvalid={!!errors.studyDuration} mb={4}>
          <FormLabel htmlFor="studyDuration">
            Durée des études (en années)
          </FormLabel>
          <Input
            id="studyDuration"
            name="studyDuration"
            type="number"
            value={formData.studyDuration}
            onChange={handleChange}
            placeholder="Entrez la durée"
          />
          {errors.studyDuration && (
            <FormErrorMessage>{errors.studyDuration}</FormErrorMessage>
          )}
        </FormControl>

        {/* Montant estimé du financement */}
        <FormControl isInvalid={!!errors.estimatedFunding} mb={6}>
          <FormLabel htmlFor="estimatedFunding">
            Montant estimé du financement (en $)
          </FormLabel>
          <Input
            id="estimatedFunding"
            name="estimatedFunding"
            type="number"
            value={formData.estimatedFunding}
            onChange={handleChange}
            placeholder="Entrez le montant estimé"
          />
          {errors.estimatedFunding && (
            <FormErrorMessage>{errors.estimatedFunding}</FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          S'inscrire
        </Button>
      </form>
    </Box>
  );
};

export default Register;
