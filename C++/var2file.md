```
	FILE *fp = NULL;
	if ((fp = fopen("/home/vmInfoXml", "wb")) == NULL) {
		fprintf(stderr, "Cannot open output file.\n");
		return -1;
	}
	fwrite(vmInfoXml, strlen(vmInfoXml), 1, fp);
	fclose(fp);
	
	system("echo xm >> /home/hejian");
	char buffer[10024];
	char *c = "dsada";
	sprintf(buffer,"echo %s >> /tmp/vmInfoXml.log", c);
	//LOGI("hejian ======= %s", buffer);
	system(buffer);


	int vmInfoXmlLen = strlen(vmInfoXml);
	LOGI("hejian vmInfoXmlLen = %d", vmInfoXmlLen);
	LOGI("hejian xml: %s \n", vmInfoXml);
	const char *data = vmInfoXml;
	for (int i = 0; i < vmInfoXmlLen / 300; i++) {
		data += 300;
		//LOGI("hejian xml: %s \n", data);
	}


```

