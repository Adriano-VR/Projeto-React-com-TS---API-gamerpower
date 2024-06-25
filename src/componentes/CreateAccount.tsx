import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SquareArrowLeft } from "lucide-react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {  database } from "../db/db";
import { push, ref, set } from "firebase/database";
import { Flip, ToastContainer, toast } from "react-toastify";
import { Icon } from '@iconify-icon/react';


const steps = [
  {
    label: "Username",
    inputType: "text", 
  },
  {
    label: "Password",
    inputType: "password", 
  }
 
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");





  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  



  const handleInputChange = (rotulo:string , event: React.ChangeEvent<HTMLInputElement>) => {
    if(rotulo === "Username") setUsername(event.target.value);
    if(rotulo === "Password") setPassword(event.target.value);
    
  };
  const navigate = useNavigate();



  const add = async () => {
   
  
    try {
      const usuariosRef = ref(database, 'usuarios');
      const novoUsuarioRef = push(usuariosRef); // Obtém uma referência para o novo nó
      const novoUsuarioKey = novoUsuarioRef.key; // Obtém a chave única gerada pelo Firebase
  
      // Define os favoritos como um array vazio
      const favoritos:Array<string>  = [];
  
      // Adiciona os dados do novo usuário ao banco de dados usando set()
      await set(novoUsuarioRef, {
        id: novoUsuarioKey, // Salva o ID gerado como parte dos dados do usuário
        username: username,
        senha: password,
        favoritos: favoritos // Define os favoritos como um array vazio
      });
  
    
      toast.success("Usuário adicionado com sucesso", {
        position: "top-center",
        autoClose: 2400,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    
    } catch (err) {
      toast.error("Erro ao adicionar usuário", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  




  return (
    <>
     <ToastContainer />


    <div className=" flex items-center justify-center h-screen ">
      <div className="p-5 shadow-inner py-10 rounded   bg-black/40">
    

        <div className="mb-5 grid grid-cols-4 items-center">
            <div>
            <SquareArrowLeft
              onClick={() => {
                navigate("/login");
              }}
              size={40}
              style={{cursor: "pointer"}}
            /> 
            </div>
            <div className="col-span-2 justify-self-center ">
            <p className="text-2xl ">Create Account</p>
            </div>

          </div>
    <Box sx={{ width: 600}}> 
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}
          sx={{
            "& .MuiStepLabel-root .Mui-completed": {
                color: "#fff",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: "#101a9f",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-root .Mui-active": {
                color: "#fff",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                color: "#38a832",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "blue",
                fontFamily: "poppins"
            },
            
            
        }}
          >
           
           
            <StepLabel>
            Informe {step.label}
            </StepLabel>
            <StepContent  className="p-3">
          
                <label
                htmlFor="Username"
                className="relative  block rounded-md  border border-gray-200 shadow-sm focus-within:border-blue-100 focus-within:ring-1 focus-within:ring-blue-100"
                >
                <input
                 onChange={(e) => handleInputChange(step.label , e)}
                  type={step.inputType}
                  value={ step.label === 'Username' ? username : password}
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0  h-12"
                  placeholder={step.label}
                />
        
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs text-blue-00 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  {step.label}
                </span>
              </label>
        

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      (step.label === 'Username' && !username) || 
                      (step.label === 'Password' && !password) 
                   
                    }
                    sx={{ mt: 1, mr: 1,fontFamily:'poppins' }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 ,fontFamily:"poppins" }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 2,backgroundColor:'transparent' , marginTop:3   }}>
              
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1,color:'#fff',fontFamily:'poppins' }}>
          <Icon icon="mdi:remove-box-outline" style={{fontSize:20}}/>
            Resetar
          </Button>
          <Button onClick={add}sx={{ mt: 1, mr: 1,color:'#fff',fontFamily:'poppins' }}>
          <Icon icon="line-md:square-to-confirm-square-transition" style={{fontSize:20}} />
            Confirmar
          </Button>
      
        </Paper>
      )}
    </Box>
    </div>
    </div>
    </>
  );
}
