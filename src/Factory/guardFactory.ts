import Guard from "../Guard/Guard";
import { Config as NearDuplicateFinderConfig } from "./duplicatesFinderFactory";
import { Config as CandidatesFinderConfig } from "./candidatesFinderFactory";
import ApplicatorGuard from "../Guard/ApplicatorGuard";
import IsMinSimilarityGuard from "../Guard/IsMinSimilarityGuard";
import IsShinglesSizeGuard from "../Guard/IsShinglesSizeGuard";
import IsSignatureLengthGuard from "../Guard/IsSignatureLengthGuard";
import IsShinglesTypeGuard from "../Guard/IsShinglesTypeGuard";
import IsRowsPerBandGuard from "../Guard/IsRowsPerBandGuard";

export const makeNearDuplicateFinderConfigGuard =
  (): Guard<NearDuplicateFinderConfig> => {
    const applicator = new ApplicatorGuard<NearDuplicateFinderConfig>();

    applicator.addGuard(new IsMinSimilarityGuard());
    applicator.addGuard(new IsShinglesSizeGuard());
    applicator.addGuard(new IsShinglesTypeGuard());
    applicator.addGuard(new IsSignatureLengthGuard());
    applicator.addGuard(new IsRowsPerBandGuard());

    return applicator;
  };

export const makeCandidatesFinderConfigGuard =
  (): Guard<CandidatesFinderConfig> => {
    const applicator = new ApplicatorGuard<NearDuplicateFinderConfig>();

    applicator.addGuard(new IsShinglesSizeGuard());
    applicator.addGuard(new IsShinglesTypeGuard());
    applicator.addGuard(new IsSignatureLengthGuard());
    applicator.addGuard(new IsRowsPerBandGuard());

    return applicator;
  };
