import glob
import sys
from pathlib import Path

for graph_picture in glob.glob(sys.argv[1] + '/*.svg'):
    print(Path(graph_picture).stem)