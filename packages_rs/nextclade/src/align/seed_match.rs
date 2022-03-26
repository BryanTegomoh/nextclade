use crate::io::nuc::Nuc;

pub struct SeedMatchResult {
  pub shift: usize,
  pub score: usize,
}

pub fn seed_match(kmer: &[Nuc], ref_seq: &[Nuc], start_pos: usize, mismatches_allowed: usize) -> SeedMatchResult {
  let ref_len = ref_seq.len();
  let kmer_len = kmer.len();

  let mut tmp_score: usize;
  let mut max_score = 0;
  let mut max_shift = 0;

  let end_pos = ref_len - kmer_len;
  for shift in start_pos..end_pos {
    tmp_score = 0;

    for pos in 0..kmer_len {
      if kmer[pos] == ref_seq[shift + pos] {
        tmp_score += 1;
      }

      // TODO: this speeds up seed-matching by disregarding bad seeds.
      if tmp_score + mismatches_allowed < pos {
        break;
      }
    }
    if tmp_score > max_score {
      max_score = tmp_score;
      max_shift = shift;

      // if maximal score is reached
      if tmp_score == kmer_len {
        break;
      }
    }
  }

  SeedMatchResult {
    shift: max_shift,
    score: max_score,
  }
}
