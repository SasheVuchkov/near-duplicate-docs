import Guard from "../Guard/Guard";
import { Config as NearDuplicateFinderConfig } from "./duplicatesFinderFactory";
import { Config as CandidatesFinderConfig } from "./candidatesFinderFactory";
export declare const makeNearDuplicateFinderConfigGuard: () => Guard<NearDuplicateFinderConfig>;
export declare const makeCandidatesFinderConfigGuard: () => Guard<CandidatesFinderConfig>;
