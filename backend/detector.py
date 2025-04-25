import unicodedata
from typing import Dict, List, Any

# Common watermark characters used by AI systems
WATERMARK_CHARS = {
    '\u202f': 'NARROW NO-BREAK SPACE',
    '\u2009': 'THIN SPACE',
    '\u200a': 'HAIR SPACE',
    '\u200b': 'ZERO WIDTH SPACE',
    '\u200c': 'ZERO WIDTH NON-JOINER',
    '\u200d': 'ZERO WIDTH JOINER',
    '\ufeff': 'ZERO WIDTH NO-BREAK SPACE',
}

def analyze_text(text: str) -> Dict[str, Any]:
    """
    Analyze text for potential watermark characters.
    Returns locations and statistics of watermarks found.
    """
    if not isinstance(text, str):
        raise ValueError("Input must be a string")

    watermarks = []
    char_counts = {name: 0 for name in WATERMARK_CHARS.values()}
    
    for i, char in enumerate(text):
        if char in WATERMARK_CHARS:
            watermarks.append({
                "character": f"U+{ord(char):04X}",  # Format as U+XXXX
                "unicode_name": WATERMARK_CHARS[char],
                "position": i
            })
            char_counts[WATERMARK_CHARS[char]] += 1
    
    return {
        "watermarks": watermarks,
        "statistics": char_counts
    }

def clean_text(text: str) -> str:
    """
    Remove all known watermark characters from the text.
    """
    if not isinstance(text, str):
        raise ValueError("Input must be a string")
        
    return ''.join(char for char in text if char not in WATERMARK_CHARS) 