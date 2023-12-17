---
date: {{ .Date }}
{{- $title := getenv "HUGO_TITLE" }}
{{- if $title }}
title: "{{ $title }}"
{{- else }}
title: "{{ replace (replace .Name "-" " ") (now.Format "2006 01 02 ") "" | title }}"
{{- end }}
draft: true
see_also: []
---

