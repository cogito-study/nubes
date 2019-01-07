import { Resolvers } from "../generated/graphqlgen";

import { Query } from "./Query";
import { User } from "./User";
import { Note } from "./Note";
import { Subject } from "./Subject";
import { Mutation } from "./Mutation";
import { AuthPayload } from "./AuthPayload";
import { Comment } from "./Comment";
import { SubjectInfo } from "./SubjectInfo";

export const resolvers: Resolvers = {
  Query,
  User,
  Note,
  Subject,
  Mutation,
  AuthPayload,
  Comment,
  SubjectInfo
};
