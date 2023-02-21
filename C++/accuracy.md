# 精度的重要性

```
#include <inttypes.h>
#include <stdio.h>

int main()
{
    //uint8_t i;
    int8_t i;
    int16_t maxn = (2 << 8) + 50;
    for (i = 0; i < maxn; i += 10) {
        printf("i: %d, maxn: %d\n", i, maxn);
    }
    return 0;
}
```
```
i: 0, maxn: 562
i: 10, maxn: 562
i: 20, maxn: 562
i: 30, maxn: 562
i: 40, maxn: 562
i: 50, maxn: 562
i: 60, maxn: 562
i: 70, maxn: 562
i: 80, maxn: 562
i: 90, maxn: 562
i: 100, maxn: 562
i: 110, maxn: 562
i: 120, maxn: 562
i: 130, maxn: 562
i: 140, maxn: 562
i: 150, maxn: 562
i: 160, maxn: 562
i: 170, maxn: 562
i: 180, maxn: 562
i: 190, maxn: 562
i: 200, maxn: 562
i: 210, maxn: 562
i: 220, maxn: 562
i: 230, maxn: 562
i: 240, maxn: 562
i: 250, maxn: 562
i: 4, maxn: 562
i: 14, maxn: 562
i: 24, maxn: 562
i: 34, maxn: 562
i: 44, maxn: 562
i: 54, maxn: 562
i: 64, maxn: 562
i: 74, maxn: 562
i: 84, maxn: 562
i: 94, maxn: 562
i: 104, maxn: 562
i: 114, maxn: 562
i: 124, maxn: 562
i: 134, maxn: 562
i: 144, maxn: 562
i: 154, maxn: 562
i: 164, maxn: 562
i: 174, maxn: 562
i: 184, maxn: 562


i: 0, maxn: 562
i: 10, maxn: 562
i: 20, maxn: 562
i: 30, maxn: 562
i: 40, maxn: 562
i: 50, maxn: 562
i: 60, maxn: 562
i: 70, maxn: 562
i: 80, maxn: 562
i: 90, maxn: 562
i: 100, maxn: 562
i: 110, maxn: 562
i: 120, maxn: 562
i: -126, maxn: 562
i: -116, maxn: 562
i: -106, maxn: 562
i: -96, maxn: 562
i: -86, maxn: 562
i: -76, maxn: 562
i: -66, maxn: 562
i: -56, maxn: 562
i: -46, maxn: 562
i: -36, maxn: 562
i: -26, maxn: 562
i: -16, maxn: 562
i: -6, maxn: 562
i: 4, maxn: 562
i: 14, maxn: 562
i: 24, maxn: 562
i: 34, maxn: 562
i: 44, maxn: 562
i: 54, maxn: 562
i: 64, maxn: 562
i: 74, maxn: 562
i: 84, maxn: 562
i: 94, maxn: 562
```