# Errors and warnings

When processing of a sequence fails for various reasons, not all output files will contain the corresponding entry (due to limitations of file formats):

| Output file             | CLI arg                 | Failed entries? |
|-------------------------|:------------------------|:----------------|
| Nucleotide alignment    | `--output-fasta`        | no              |
| Translations            | `--output-translations` | no              |
| Tree - Auspice v2 JSON  | `--output-tree`         | no              |
| Tree - Newick           | `--output-tree`         | no              |
| Analysis results CSV    | `--output-csv`          | yes             |
| Analysis results TSV    | `--output-tsv`          | yes             |
| Analysis results NDJSON | `--output-ndjson`       | yes             |
| Analysis results JSON   | `--output-json`         | yes             |

You can find the reason for a particular failure by reading:

- `errors` and `warnigns` column in tabular outputs (TSV, CSV)
- `errors` array in JSON output
- `error` field in each entry in NDJSON output
