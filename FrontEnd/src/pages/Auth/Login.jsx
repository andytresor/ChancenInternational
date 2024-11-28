import { useState } from "react"
import { Input, Button, Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validate = () => {
        const newErrors = {};//initialise un nouvel objet vide en JavaScript. Cet objet est utilisé pour stocker les erreurs associées à chaque champ du formulaire
        
        // Validation de l'email
        if (!email) {
            newErrors.email = "L'adresse email est requise.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "L'adresse email est invalide.";
        }

        // Validation du mot de passe
        if (!password) {
            newErrors.password = "Le mot de passe est requis.";
        } else if (password.length < 6) {
            newErrors.password = "Le mot de passe doit comporter au moins 6 caractères.";
        }

        setErrors(newErrors);// Mettre à jour les erreurs dans l'état React
        return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
    };

    const handleLogin = () => {
        if (validate()) {
            // Soumission des données après validation réussie
            console.log({ email, password });
            alert("Connexion réussie !");
        } else {
            alert("Veuillez corriger les erreurs avant de continuer.");
        }
    };

    

    return (
        <Box p={4} maxW="400px" mx="auto" mt="100px" borderWidth="1px" borderRadius="lg" boxShadow="md">
            <div>
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.email}</p>}
            </div>
            <div>
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb={4}
            />
            {errors.password && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.password}</p>}           
            </div>
            <Button onClick={handleLogin} colorScheme="teal" width="full">Login</Button>
            <Text mt={4}>
                <Link color="blue.500">Forgot Password?</Link>
            </Text>
            <Text>
                Don't have an account? <Link to="/auth/register" color="blue.500">Sign Up</Link> 
            </Text>
        </Box>
    )
}

export default Login