/** @format */

import { signUpHandler } from "next-auth-sanity";
import { SanityClient } from "@sanity/client";
import sanityClient from "@/libs/sanity";

// Assert the type of sanityClient to be either SanityClient or SanityStegaClient
const client: SanityClient = sanityClient as SanityClient;

export const POST = signUpHandler(client);
