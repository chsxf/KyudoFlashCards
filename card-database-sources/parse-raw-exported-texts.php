<?php
$perPageCount = 10;

$fc = file_get_contents('raw_exported_texts.txt');
$blocks = explode("\n\n", $fc);
$blocks = array_map(trim(...), $blocks);
$blocks = array_filter($blocks, fn ($item) => !empty($item));
$blocks = array_values($blocks);

$pageCount = count($blocks) / ($perPageCount * 2);

$cards = [];
for ($i = 0; $i < $pageCount; $i++) {
    $baseOffset = $i * ($perPageCount * 2);

    for ($j = 0; $j < $perPageCount; $j++) {
        $conceptIndex = $baseOffset + $j;
        $solutionIndex = $conceptIndex + $perPageCount + (($j % 2 == 0) ? 1 : -1);

        $cards[] = [
            'concept' => $blocks[$conceptIndex],
            'solution' => $blocks[$solutionIndex]
        ];
    }
}

$encoded = json_encode($cards, JSON_PRETTY_PRINT);
file_put_contents('../card_database.json', $encoded);
