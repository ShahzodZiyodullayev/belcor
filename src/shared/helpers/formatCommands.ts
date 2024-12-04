export function formatCommands(input: string): string {
  const compress = (commands: string): string => {
    let result = "";
    let count = 1;

    for (let i = 0; i < commands.length; i++) {
      if (commands[i] === commands[i + 1]) {
        count++;
      } else {
        result += (count > 1 ? count : "") + commands[i];
        count = 1;
      }
    }

    return result;
  };

  const findAndGroupPatterns = (compressed: string): string => {
    let grouped = "";
    let i = 0;

    while (i < compressed.length) {
      // Har bir blokni belgilang
      let maxPattern = "";
      let maxCount = 0;

      for (let j = 1; j <= compressed.length - i; j++) {
        const block = compressed.slice(i, i + j);
        const regex = new RegExp(`(${block})+`, "g");
        const match = compressed.slice(i).match(regex);

        if (match && match[0].length >= block.length * 2) {
          const repeatCount = match[0].length / block.length;

          if (repeatCount > maxCount) {
            maxPattern = block;
            maxCount = repeatCount;
          }
        }
      }

      if (maxCount > 1) {
        grouped += `${maxCount}(${maxPattern})`;
        i += maxPattern.length * maxCount;
      } else {
        grouped += compressed[i];
        i++;
      }
    }

    return grouped;
  };

  const compressed = compress(input);
  return findAndGroupPatterns(compressed);
}
