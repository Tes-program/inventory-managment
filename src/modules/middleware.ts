import { ValidationError, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

export const handleInputError = (
  req: Request,
  res: {
    status: (arg0: number) => void;
    json: (arg0: { errors: ValidationError[] }) => void;
  },
  next: () => void
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
    return true;
  } else {
    next();
  }
};
