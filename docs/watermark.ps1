# Marks gallery photos: "© Phuru Shekar · phurushekar.com" in the bottom-right corner, plus
# Artist and Copyright tags. Skips photos that already carry the tag, so rerunning is safe.
# Usage (Windows PowerShell): powershell -File docs/watermark.ps1 assets/photos/new.jpg
param([Parameter(Mandatory, ValueFromRemainingArguments)][string[]]$Paths)
Add-Type -AssemblyName System.Drawing

$text = "$([char]0xA9) Phuru Shekar $([char]0xB7) phurushekar.com"
$copyright = "$([char]0xA9) $((Get-Date).Year) Phuru Shekar. All rights reserved."

function Set-Tag($img, [int]$id, [string]$value) {
  $item = $img.PropertyItems[0]  # PropertyItem has no public constructor; reuse one
  $item.Id = $id; $item.Type = 2
  $item.Value = [Text.Encoding]::UTF8.GetBytes($value + [char]0); $item.Len = $item.Value.Length
  $img.SetPropertyItem($item)
}

foreach ($path in $Paths) {
  $full = (Resolve-Path $path).Path
  # Load from memory so the file can be overwritten.
  $img = [Drawing.Image]::FromStream([IO.MemoryStream]::new([IO.File]::ReadAllBytes($full)))
  if ($img.PropertyIdList -contains 0x8298) { "skip (already marked): $path"; $img.Dispose(); continue }

  $short = [Math]::Min($img.Width, $img.Height)
  $g = [Drawing.Graphics]::FromImage($img)
  $g.SmoothingMode = 'AntiAlias'; $g.TextRenderingHint = 'AntiAliasGridFit'
  $font = [Drawing.Font]::new('Segoe UI Semibold', [float]($short * 0.022), [Drawing.GraphicsUnit]::Pixel)
  $size = $g.MeasureString($text, $font)
  $margin = $short * 0.025
  $x = $img.Width - $size.Width - $margin; $y = $img.Height - $size.Height - $margin
  $shadow = [Math]::Max(1, $short * 0.0015)
  $g.DrawString($text, $font, [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(110, 0, 0, 0)), $x + $shadow, $y + $shadow)
  $g.DrawString($text, $font, [Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(200, 255, 255, 255)), $x, $y)
  $g.Dispose()

  Set-Tag $img 0x013B 'Phuru Shekar'  # Artist
  Set-Tag $img 0x8298 $copyright      # Copyright

  $jpeg = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
  $params = [Drawing.Imaging.EncoderParameters]::new(1)
  $params.Param[0] = [Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality, [long]92)
  $img.Save($full, $jpeg, $params); $img.Dispose()
  "marked: $path"
}
