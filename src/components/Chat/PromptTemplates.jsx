import { Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import promptTemplates from "../../constants/PromptTemplates";

export default function PromptTemplates({ handleSend }) {
  return (
    <div className="row row--gap row--center">
      {promptTemplates.map((t) => (
        <Card
          component="button"
          onClick={() => {
            handleSend(t.description);
          }}
          key={t.id}
          sx={{
            cursor: "pointer",
            display: "flex",
            textAlign: "start",
            color: "var(--white)",
            borderRadius: "1rem",
            bgcolor: "transparent",
            width: "10rem",
            height: "8rem",
            borderWidth: "1px",
            borderColor: "var(--border-light)",
            borderStyle: "solid",
            ":last-child": { paddingBottom: "0" },
            ":hover": {
              bgcolor: "var(--main-surface-secondary)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              fontSize: "15px",
              gap: "0.5rem",
              ":last-child": { paddingBottom: "0.5rem" },
            }}
          >
            <img
              width="24px"
              height="24px"
              src={t.iconPath}
              alt="template-icon"
            />
            <span>{t.description}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

PromptTemplates.propTypes = {
  handleSend: PropTypes.func.isRequired,
};
