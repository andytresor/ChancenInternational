import { useState } from "react"
import { Input, Button, Box,Heading, Stack,Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Field } from "../../components/ui/field";
import  axios from "axios";
import "../../style/authstyles/login.css"

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

    const handleLogin = async () => {
        if (validate()) {
            try{
                const response = await axios.post('http://localhost:3000/auth/login' , {email , password});
                console.log('Réponse de l\'API :', response.data); 
                alert("Connexion réussie !");
            }catch(error) {
                console.error('Erreur lors de la connexion :', error); 
                alert("Erreur lors de la connexion. Veuillez vérifier vos informations et réessayer."); 
            }
            // Soumission des données après validation réussie
            console.log({ email, password });
            alert("Connexion réussie !");
        } else {
            alert("Veuillez corriger les erreurs avant de continuer.");
        }
    };

    return (
        <Box>
      <div className="full">
        <form className="form">
        <Box 
        p={10} 
        mx="auto" 
        borderRadius="lg" 
        boxShadow="md"
         >
        <Heading
            as="h1"
            size="3xl"
            mb={6}
            textAlign="center"
          >
          Login
          </Heading>
          <Stack
              gap="4"
              align="flex-start"
              maxW="600"
            >
            <Field 
            className="field"
            label="Email"
            >
            <Input
                className="input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb={4}
            />
            {errors.email && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.email}</p>}
        
          </Field>
          <Field 
            className="field"
            label="Password"
            >
            <Input
                 className="input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                mb={4}
            />
            {errors.password && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{errors.password}</p>}           
           </Field>
            <Button onClick={handleLogin} colorScheme="teal" width="full" className="button">
                Login
                </Button>
                <div className="link">
            <Text style={{color:'blue',textDecoration:'underline',marginRight:'4rem'}}>
                Forgot Password?
            </Text>
            <Text>
                Don't have an account? <Link href="/auth/register" color="blue.500">Sign Up</Link>
            </Text>
            </div>
            </Stack>
        </Box>
        </form>
        </div>
        </Box>
    )
}

export default Login