# NOCONFIGURE

allow autogen.sh to not run configure with NOCONFIGURE

```autogen.sh
#! /bin/sh
srcdir=`dirname "$0"`
test -z "$srcdir" && srcdir=.
ORIGDIR=`pwd`
MAKEFLAGS=""
cd $srcdir
autoreconf -v --install || exit 1
cd $ORIGDIR || exit $?

"$srcdir"/configure "$@"
if test -z "$NOCONFIGURE"; then
	"$srcdir"/configure "$@"
fi
```

NOCONFIGURE=1 ./autogen.sh


相关资料极少。
目的大概是：