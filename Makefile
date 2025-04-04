.PHONY: dev

dev:
	hugo server -D --disableFastRender --bind=0.0.0.0 --logLevel=debug
