# 工程中常用的demo库

//巧妙：删除字符串的首尾多余的字符，如空格
//str为字符串，delimiter也可为字符串
//strchr函数：前参数为字符串，后参数为单个字符
char* trim(char* str, const char* delimiter)
{
    if (str == 0 || str[0] == 0) {
        return str;
    }
    
    char* p1 = str;
    char* p2 = NULL;
    int len;


    len = strlen(p1);
    p2 = p1 + len - 1;
    while (strchr(delim, *p1))
        p1++;
    if(p1>p2)
    {
        return NULL;
    }
    if (*p1 == 0)
        return p1;


    while (strchr(delim, *p2))
        p2--;
    if(p2<str)
    {
        return NULL;
    }
    *(p2+1) = 0;
    return p1;
}

/*
配置文件
[basic]
name=hj
age=22
sex=fale

[midle]
phone=110
email=110@163.com

[senior]
address=chongqing
school=whu
*/
int config_file_get(const char* filename, const char* section, const char* key, char* value)
{
    FILE* file = 0;
    char buff[1024];
    char* line = 0;
    int length = 0;
    int sec_len = strlen(section);
    int key_len = strlen(key);
    char* pos = 0;
    int findflag = 0; //0: none-find section, 1:find section, but none-find key, 2:find key

    file = fopen(filename, "rt");
    if (!file)
        return 0;

    while(!feof(file))
    {
        line = buff;
        if (0 == fgets(line, sizeof(buff), file))
            goto __end;
        trim(line, " \r\n\t");

        if (line[0]=='['
                && line[strlen(line)-1]==']'
           )
        {
            if (0 == findflag
                    && strncmp(&line[1], section, sec_len)==0
                    && line[sec_len+1]==']'
               )
            {
                findflag = 1;
            }
            else
            {
                findflag = 0;
            }
            continue;
        }

        if (1 == findflag)
        {
            pos = strchr(line, '=');
            if (pos)
            {
                *pos = 0;
                if (strncmp(trim(line, " \r\n\t"), key, key_len)==0)
                {
                    pos++;
                    findflag = 2;
                }
            }
        }

        if (2 == findflag)
        {
            char* v = trim(pos, " \r\n\t");
            length = strlen(v);
            strcpy(value, v);
            goto __end;
        }
    }


__end:
    if (file)
    {
        fclose(file);
    }
    return length;
}

static int is_power_of_2(uint32_t n)
{
	return (n != 0 && ((n & (n - 1)) == 0));
}

```
          
