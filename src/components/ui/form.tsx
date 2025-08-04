import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FormProvider,
  FieldPath,
  FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import {
  FormFieldContext,
  FormItemContext,
  useFormField,
} from "@/components/ui/form-context"

const Form = FormProvider
