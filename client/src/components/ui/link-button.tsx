"use client"

import type { HTMLChakraProps, RecipeProps } from "@chakra-ui/react"
import { createRecipeContext } from "@chakra-ui/react"
import { Link } from "react-router"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LinkButtonProps
  extends HTMLChakraProps<typeof Link, RecipeProps<"button">> {}

const { withContext } = createRecipeContext({ key: "button" })

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>(Link)
