import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Fragment, type ReactNode } from "react";

interface FlowStep {
  icon: ReactNode;
  label: string;
  description: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    icon: <BusinessOutlinedIcon fontSize="small" />,
    label: "Cuenta de Meta",
    description: "Aplicación creada en Meta Developers.",
  },
  {
    icon: <PhoneIphoneOutlinedIcon fontSize="small" />,
    label: "Número de WhatsApp",
    description: "Número asociado a la cuenta de Meta.",
  },
  {
    icon: <WebhookOutlinedIcon fontSize="small" />,
    label: "Webhook público",
    description: "El backend recibe los eventos de Meta.",
  },
  {
    icon: <DnsOutlinedIcon fontSize="small" />,
    label: "Backend",
    description: "Procesa los mensajes y genera respuestas.",
  },
  {
    icon: <SmartToyOutlinedIcon fontSize="small" />,
    label: "Asistente IA",
    description: "Responde utilizando la información del negocio.",
  },
];

export function IntegrationSteps() {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
        Cómo funciona la integración
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 1 }}
        sx={{ alignItems: { xs: "stretch", md: "flex-start" } }}
      >
        {FLOW_STEPS.map((step, index) => (
          <Fragment key={step.label}>
            <Stack
              spacing={0.5}
              sx={{
                alignItems: { xs: "flex-start", md: "center" },
                textAlign: { xs: "left", md: "center" },
                flex: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "action.hover", color: "text.secondary", width: 40, height: 40 }}>
                {step.icon}
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {step.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {step.description}
              </Typography>
            </Stack>
            {index < FLOW_STEPS.length - 1 && (
              <Box
                aria-hidden="true"
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  pt: 2.5,
                }}
              >
                <ArrowForwardIcon fontSize="small" color="disabled" />
              </Box>
            )}
          </Fragment>
        ))}
      </Stack>
    </Box>
  );
}
