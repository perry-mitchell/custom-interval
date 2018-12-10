## Functions

<dl>
<dt><a href="#clearCustomInterval">clearCustomInterval(tracker)</a></dt>
<dd><p>Clear a running interval</p>
</dd>
<dt><a href="#setCustomInterval">setCustomInterval(callback, intervals, [options])</a> ⇒ <code><a href="#CustomIntervalTracker">CustomIntervalTracker</a></code></dt>
<dd><p>Set a custom interval timer</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SetCustomIntervalOptions">SetCustomIntervalOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CustomIntervalTracker">CustomIntervalTracker</a> : <code>Object</code></dt>
<dd><p>Tracker variable for custom intervals (used for clearing)</p>
</dd>
</dl>

<a name="clearCustomInterval"></a>

## clearCustomInterval(tracker)
Clear a running interval

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tracker | [<code>CustomIntervalTracker</code>](#CustomIntervalTracker) | The interval to clear |

**Example**  
```js
const interval = setCustomInterval(callback, 5000);
 clearCustomInterval(interval);
```
<a name="setCustomInterval"></a>

## setCustomInterval(callback, intervals, [options]) ⇒ [<code>CustomIntervalTracker</code>](#CustomIntervalTracker)
Set a custom interval timer

**Kind**: global function  
**Returns**: [<code>CustomIntervalTracker</code>](#CustomIntervalTracker) - A tracker for the newly started interval  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to execute when the interval fires |
| intervals | <code>Number</code> \| <code>Array.&lt;(String\|Number)&gt;</code> | An interval in milliseconds or  an array of interval values. Values will be used and shifted-off the array  until only one is left, which will be used continuously beyond that point. |
| [options] | [<code>SetCustomIntervalOptions</code>](#SetCustomIntervalOptions) | Optional configuration options |

**Example**  
```js
// Basic interval
 setCustomInterval(() => {}, 1500);
 // Interval with 2 delay counts, clearing after it
 const interval = setCustomInterval(() => {}, [100, 500]);
 // Later:
 clearCustomInterval(interval);
 // Interval with value expansion:
 setCustomInterval(cb, [100, "5x250", 500]);
```
<a name="SetCustomIntervalOptions"></a>

## SetCustomIntervalOptions : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [immediate] | <code>Boolean</code> | Immediately fire the callback (default=false) |

<a name="CustomIntervalTracker"></a>

## CustomIntervalTracker : <code>Object</code>
Tracker variable for custom intervals (used for clearing)

**Kind**: global typedef  
