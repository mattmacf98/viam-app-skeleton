package main

import (
	"context"
	"time"

	"github.com/erh/vmodutils"
	viamappskeleton "github.com/mattmacf98/viam-app-skeleton"
	"go.viam.com/rdk/components/generic"
	"go.viam.com/rdk/logging"
)

func main() {
	err := realMain()
	if err != nil {
		panic(err)
	}
}

func realMain() error {
	ctx := context.Background()
	logger := logging.NewLogger("cmd-run")

	fs, err := viamappskeleton.DistFS()
	if err != nil {
		return err
	}

	ws, err := vmodutils.NewWebModuleAndStart(generic.Named("foo"), fs, logger, 8888)
	if err != nil {
		return err
	}
	defer ws.Close(ctx)

	time.Sleep(time.Minute)

	return nil
}
