import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { createDatabase } from "../db/db";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SquareArrowLeft } from "lucide-react";


const steps = [
  {
    label: "Username",
    inputType: "text", 
  },
  {
    label: "Password",
    inputType: "text", 
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

  const add = async() => {
    if(!username || !password) {
      console.log("CAmpos Vazios");
      
      return;
    }
    try {
        const id = uuidv4()
        const db = await createDatabase();
        await db.users.insert({id ,name:username,password})
        toast.success("Conta Criada com Sucesso", {
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
        
    } catch (error) {
      toast.error("Erro," + error + "", {
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
        
    }

  }

  return (
    <>
    <ToastContainer />

    <div className=" flex items-center justify-center h-screen ">
      <div className=" shadow-md p-5 ">
    

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
                color: " rgb(34 197 94)",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                color: "blue",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-root .Mui-active": {
                color: " rgb(212 212 216)",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                color: "#38a832",
                fontFamily: "poppins"
            },
            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "#0e64ab",
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
                className="relative  block rounded-md  border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                <input
                 onChange={(e) => handleInputChange(step.label , e)}
                  type={step.inputType}
                  value={ step.label === 'Username' ? username : password}
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0  h-12"
                  placeholder={step.label}
                />
        
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs text-zinc-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
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
              <Button onClick={add}sx={{ mt: 1, mr: 1,color:'white',fontFamily:'poppins' }}>
            Confirmar
          </Button>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1,color:'white',fontFamily:'poppins' }}>
            Resetar
          </Button>
      
        </Paper>
      )}
    </Box>
    </div>
    </div>
    </>
  );
}
